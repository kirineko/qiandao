require './app'

app = Rack::Builder.new do
  map '/' do
    run App
  end
end

run app
