#!/usr/bin/env ruby
require 'octokit'
require 'base64'
require 'yaml'
require 'json'

client = Octokit::Client.new(access_token: 'ddbcd5808478d9fad3627fb5545313b31bd3276a')
repos = JSON.load(open('src/data.json'))
data = repos.map do |data|
  puts data['name']
  repo = client.repo(data['repo'])
  data[:releases] = []
  data[:description] = repo.description
  repo.rels[:releases].get.data.each do |r|
    release = { name: r.tag_name, created_at: r.created_at }
    begin
      manifest = client.contents(data['repo'], path: 'manifest.yml', ref: r.tag_name)
      manifest = YAML.load(Base64.decode64(manifest[:content]))
      release[:dependencies] = manifest['dependencies'].map {|d| {name:d['name'], version:d['version'],md5:d['md5']}}
    rescue
      release[:dependencies] = []
    end
    data[:releases] << release
  end
  data
end

open('src/data.json', 'w') do |f|
  f.puts data.to_json
end
