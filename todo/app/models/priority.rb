# == Schema Information
#
# Table name: priorities
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  color      :string(255)      default("#fff")
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  value      :integer          default(1)
#

class Priority < ActiveRecord::Base
  attr_accessible :name, :color, :value
  belongs_to :user, :inverse_of => :priorities
  has_many :tasks, :inverse_of => :priority
end
