class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを編集しました"
    else
      render :edit
    end
  end

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

  def set_group
    @group = Group.find(params[:id])
  end
end
