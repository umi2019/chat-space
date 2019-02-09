class GroupsController < ApplicationController
  def new
    @users = User.all
    @group = Group.new
    # @group.users.build
  end

  def create
    if Group.create(group_params)
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, {user_ids: []}  )
  end
end
