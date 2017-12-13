#!/usr/bin/env ruby
require 'json'

BUILDPACKS_JSON = File.join(File.dirname(File.expand_path(__FILE__)), 'buildpacks.json').to_s
DATA_FILE = ARGV[0] or raise "USAGE: merge.rb [DATA FILE]"

repos = JSON.load(open(BUILDPACKS_JSON))
data = JSON.load(open(DATA_FILE))

data = data.zip(repos).map do |main,extra|
  raise 'Not match' unless main['id'] == extra['id']
  main.merge(extra)
end

open(DATA_FILE, 'w') do |f|
  f.puts data.to_json
end
