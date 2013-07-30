  class StocksController < ApplicationController
  before_filter :only_authorized

  def index

    @stocks = @auth.stocks.uniq.sort
    @stock = Stock.new

  end


  # def new
  #   @stock = Stock.new
  # end

def chart
  render :json => @auth.stocks.where(:symbol => params[:symbol])
end

def create
      if @auth.has_enough_money?(params[:stock][:symbol], params[:stock][:shares])
     @auth.purchase(params[:stock][:symbol], params[:stock][:shares])

      @stocks = @auth.stocks

  end
end



  private
  def only_authorized
    redirect_to(root_path) if @auth.nil?
  end




end


