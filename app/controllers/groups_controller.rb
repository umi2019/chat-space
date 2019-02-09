class GroupsController < ApplicationController
  def new
    @users = User.all
  end
end
