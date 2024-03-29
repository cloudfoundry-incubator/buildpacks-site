#!/usr/bin/env ruby
require 'octokit'
require 'base64'
require 'yaml'
require 'json'
require 'semantic'
require 'date'

BUILDPACKS_JSON = File.join(File.dirname(File.expand_path(__FILE__)), 'buildpacks.json').to_s
OUTPUT_FILE = ARGV[0] or raise "USAGE: bundle exec dl.rb [OUTPUT FILE]"
ACCESS_TOKEN = ENV['ACCESS_TOKEN'] or raise 'Please provide github ACCESS_TOKEN as env variable'

class Manifest
  def initialize(client, repo, ref)
    begin
      manifest = client.contents(repo, path: 'manifest.yml', ref: ref)
      @manifest = YAML.load(Base64.decode64(manifest[:content]))
      if @manifest.fetch('dependencies', []).any? { |x| x.class != Hash }
        @manifest['no_manifest'] = true
        @manifest['dependencies'] = @manifest['dependencies'].select { |x| x.class == Hash }
      end
    rescue Octokit::NotFound
      @manifest = { 'dependencies' => [], 'no_manifest' => true }
    end
  end

  def dependencies
    @manifest['dependencies'].map do |d|
      hash = { name: d['name'], version: d['version'], eol: eol(d['name'], d['version']), stack: d['cf_stacks'].join(", ") }
      hash[:md5] = d['md5'] if d['md5']
      hash[:sha256] = d['sha256'] if d['sha256']
      hash
    end.sort_by do |d|
      [ d[:name], (Gem::Version.new(d[:version]) rescue d[:version]) ]
    end
  end

  private

  def eol(name, version)
    return nil unless @manifest['dependency_deprecation_dates']
    @manifest['dependency_deprecation_dates'].map do |dep|
      next unless dep['name'] == name
      if dep['match']
        dep['date'].to_s if Regexp.new(dep['match']).match(version) rescue false
      elsif dep['version_line']
        if dep['version_line'].include?('x.x')
          dep['date'].to_s if Semantic::Version.new(version).satisfies?(dep['version_line'].gsub(/\.x\.x$/,'')) rescue version == dep['version_line']
        else
          dep['date'].to_s if Semantic::Version.new(version).satisfies?(dep['version_line'].gsub(/\.x$/,'')) rescue version == dep['version_line']
        end
      end
    end.compact.first
  end
end

client = Octokit::Client.new(access_token: ACCESS_TOKEN)
repos = JSON.load(open(BUILDPACKS_JSON))
data = repos.map do |data|
  puts data['name']
  repo = client.repo(data['repo'])
  data[:releases] = []
  data[:description] = repo.description
  repo.rels[:releases].get.data.each do |r|
    release = { name: r.tag_name, created_at: r.created_at.iso8601 }
    manifest = Manifest.new(client, data['repo'], r.tag_name)
    begin
      release[:dependencies] = manifest.dependencies
    rescue => e
      puts "ERROR: #{e}"
      release[:dependencies] = []
    end
    data[:releases] << release
  end
  data
end

open(OUTPUT_FILE, 'w') do |f|
  f.puts data.to_json
end
