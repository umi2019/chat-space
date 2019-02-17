class Group < ApplicationRecord
  has_many :users, through: :members
<<<<<<< HEAD
  has_many :members
=======
  has_many :messages
  has_many :members

  validates :name, presence: true
>>>>>>> master
end
