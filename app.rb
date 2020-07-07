# frozen_string_literal: true

require 'sinatra'
require 'sinatra/base'
require 'redis'

configure { set :server, :puma }

class App < Sinatra::Base
  # @return [Redis]
  def redis
    $redis ||= Redis.new({ password: 'kirinekoneko' })
  end

  get '/' do
    erb :index
  end

  post '/result' do
    number = params['number']
    name = params['name']

    if redis.get(number)
      uid = redis.get(number)
    else
      user_info = {
        number: number,
        name: name
      }
      uid = redis.incr('uid').to_s
      redis.mapped_hmset("user:#{uid}", user_info)
      redis.set(number, uid)
    end

    redis.lpush("user:#{uid}:signtime", Time.now.strftime('%Y-%m-%d %H:%M:%S'))
    result = {
      number: number,
      name: name,
      count: redis.llen("user:#{uid}:signtime"),
      times: redis.lrange("user:#{uid}:signtime", 0, -1)
    }

    erb :result, locals: result
  end

  post '/history' do
    number = params['number']

    if redis.get(number)
      uid = redis.get(number)
      user_info = redis.hgetall("user:#{uid}")
      result = {
        code: 0,
        data: {
          number: user_info['number'],
          name: user_info['name'],
          count: redis.llen("user:#{uid}:signtime"),
          times: redis.lrange("user:#{uid}:signtime", 0, -1)
        }
      }
    else
      result = {
        code: -1,
        data: {}
      }
    end
    result.to_json
  end
end
