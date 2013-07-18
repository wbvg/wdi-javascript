module ApplicationHelper
  def intellinav
    if @auth.present?
      link_to(@auth.email, login_path, :method => :delete)
    else
      link_to('login', login_path)
   end
 end
end
