class PrioritiesController < ApplicationController
  def index
    @priorities = @auth.priorities
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
    higher = @auth.priorities.where('value > ?', priority.value).order('value ASC').first

      if higher.present?
        temp = priority.value
        priority.value = higher.value
        higher.value = temp
        priority.save
        higher.save
        render :json => [priority, higher]
      else
        render :json => [priority]
      end
  end

  def down
    priority = Priority.find(params[:id])
    lower = @auth.priorities.where('value < ?', priority.value).order('value DESC').first

    if lower.present?
      temp = priority.value
      priority.value = lower.value
      lower.value = temp
      priority.save
      lower.save
      render :json => [priority, lower]
    else
      render :json => [priority]
  end

  end

end