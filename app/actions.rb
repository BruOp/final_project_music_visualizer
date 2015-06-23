# Homepage (Root path)
get '/' do
  erb :index
end

get '/visualizations' do 
  content_type :json
  visualizations = Visualization.all
  visualizations.to_json
end

post '/visualizations/new' do 
  content_type :json
  visualization = Visualization.create!(
    song_path: params[:song_path],
    song_name: params[:song_name]
    )
  visualization.to_json
end

post '/visualizations/:viz_id/transitions' do
  console.log(params[:viz_id])
  content_type :json
  transition = Transition.create!(
    visualization_id: params[:viz_id],
    time: params[:time],
    params: params[:parameters]
    );
  transitions.to_json
end

get '/visualizations/:viz_id/transitions' do
  content_type :json
  transitions = Visualization.find(params[:viz_id]).tranistions
  transitions.to_json;
end

