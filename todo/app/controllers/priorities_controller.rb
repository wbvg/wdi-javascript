class PrioritiesController < ApplicationController
  def index
    @priorities = @auth.priorities
  end

  def create
    id = params[:id]
    color = params[:color]
    name = params[:name]
    value = params[:value]

    if id.present?
      priority = Priority.find(id)
      priority.color = color
      priority.name = name
      priority.value = value
      priority.save
    # fancy pants way for jerks:
    # @auth.priorities.create(:color => color, :name => name, :value => value) << clever
    else
      priority = Priority.create(:color => color, :name => name, :value => value)
      @auth.priorities << priority
    end

    render :json => priority

  end
end