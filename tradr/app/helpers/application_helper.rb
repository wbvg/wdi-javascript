module ApplicationHelper
  def login_nav
    if @auth.present?
      link_to(@auth.email, login_path, :method => :delete, :class => 'btn button-danger')

    else
      link_to('Login', login_path, :class => 'btn button-success')
    end
  end



  def user_logged_in_nav
      if @auth.present?
         button_tag(number_to_currency(@auth.balance), :class => 'btn btn-success', :id => 'update_balance')
      end
end
end