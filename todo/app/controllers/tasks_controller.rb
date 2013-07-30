class TasksController < ApplicationController
  before_filter :ensure_logged_in

  def index
      @tasks = @auth.tasks.joins(:priority).order('tasks.is_complete ASC').order('priorities.value ASC').order('tasks.title ASC')
  end

  def create
    task = Task.create(params[:task])
    @auth.tasks << task

    # We return a specific hash here so we can include the priority name.
    # render :json => {
    #   id: task.id,
    #   title: task.title,
    #   description: task.description,
    #   duedate: task.duedate,
    #   is_complete: task.is_complete,
    #   priority_id: task.priority_id,
    #   priority: task.priority.name,
    #   address: task.address,
    #   longitude: task.longitude,
    #   latitude: task.latitude
    # }
     render :json => task.as_json(:include => :priority)
  end

  def update
    task = Task.find(params[:id])
    task.update_attributes(params[:task])

    render :json => task.as_json(:include => :priority)
  end

end