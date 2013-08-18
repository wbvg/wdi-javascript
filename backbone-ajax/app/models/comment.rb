class Comment < ActiveRecord::Base
  belongs_to :post
  attr_accessible :twaddle, :post_id
end
