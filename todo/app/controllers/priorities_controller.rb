class PrioritiesController < ApplicationController
  before_filter :ensure_logged_in
  def index
    @priorities = @auth.priorities.order(:value).reverse
  end

  def create
    color = params[:color]
    name = params[:name]
    value = params[:value]

    # fancy pants way for jerks:
    # @auth.priorities.create(:color => color, :name => name, :value => value) << clever
      priority = Priority.create(:color => color, :name => name, :value => value)
      @auth.priorities << priority

    render :json => priority

  end

  def update
    id = params[:id]
    # color = params[:color]
    # name = params[:name]
    # value = params[:value]

    priority = Priority.find(id)
    priority.update_attributes(params[priority])
    # priority.color = color
    # priority.name = name
    # priority.value = value
    # priority.save

    render :json => priority
  end

  def up
    priority = Priority.find(params[:id])
    render :json => priority.swap_higher(@auth)
  end

  def down
    priority = Priority.find(params[:id])
    render :json => priority.swap_lower(@auth)
  end


end