class PrioritiesController < ApplicationController
  def index
    @priorities = @auth.priorities
  end

  def create
    binding.pry
  end
end