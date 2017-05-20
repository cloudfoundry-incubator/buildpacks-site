#!/usr/bin/env ruby
require 'octokit'
require 'base64'
require 'yaml'
require 'json'
require 'semantic'

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
      { name: d['name'], version: d['version'], md5: d['md5'], eol: eol(d['name'], d['version']) }
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
        Semantic::Version.new(version).satisfies?(dep['version_line'].gsub(/\.x$/,''))
      end
    end.compact.first
  end
end

client = Octokit::Client.new(access_token: ENV.fetch('ACCESS_TOKEN'))
repos = JSON.load(open('../static/buildpacks.json'))
data = repos.map do |data|
  puts data['name']
  repo = client.repo(data['repo'])
  data[:releases] = []
  data[:description] = repo.description
  repo.rels[:releases].get.data.each do |r|
    release = { name: r.tag_name, created_at: r.created_at }
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

open('../static/buildpacks.json', 'w') do |f|
  f.puts data.to_json
end
