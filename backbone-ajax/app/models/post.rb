class Post < ActiveRecord::Base
  attr_accessible :content, :slug, :title
  has_many :comments
end
