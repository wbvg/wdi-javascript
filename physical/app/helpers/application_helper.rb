module ApplicationHelper
  def login_nav
    if @auth.present?
      link_to(@auth.email, login_path, :method => :delete, :class => 'btn btn-danger')
    else
      link_to('Login', login_path, :class => 'btn btn-success')
    end
  end
end
