class TasksController < ApplicationController
  before_filter :ensure_logged_in

  def index
    @tasks = @auth.tasks
  end

  def create
    task = Task.create(params[:task])
    @auth.tasks << task

    # We return a specific hash here so we can include the priority name.
    render :json => {
      id: task.id,
      title: task.title,
      description: task.description,
      duedate: task.duedate,
      is_complete: task.is_complete,
      priority_id: task.priority_id,
      priority: task.priority.name,
      address: task.address,
      longitude: task.longitude,
      latitude: task.latitude
    }
  end
end