require 'spec_helper'

describe HomeController do

  describe 'GET/' do
    it "should respond" do
      get :index
      expect(response).to be_success
    end
  end

  describe 'GET /countries/:stop/:offset' do

    before do
      @countries = Country.create(
          [
            {name:"Ascension Island", abbreviation:"ac"},
            {name:"Andorra", abbreviation:"ad"},
            {name:"United Arab Emirates", abbreviation:"ae"},
            {name:"Afghanistan", abbreviation:"af"},
            {name:"Antigua and Barbuda", abbreviation:"ag"},
            {name:"Anguilla", abbreviation:"ai"},
            {name:"Albania", abbreviation:"al"},
            {name:"Armenia", abbreviation:"am"},
            {name:"Netherlands Antilles", abbreviation:"an"},
            {name:"Angola", abbreviation:"ao"},
            {name:"Antarctica", abbreviation:"aq"},
            {name:"Argentina", abbreviation:"ar"},
            {name:"American Samoa", abbreviation:"as"},
            {name:"Austria", abbreviation:"at"},
            {name:"Australia", abbreviation:"au"},
            {name:"Aruba", abbreviation:"aw"},
            {name:"Aland Islands", abbreviation:"ax"},
            {name:"Azerbaijan", abbreviation:"az"}
          ]
        )
    end

    it "should respond" do
      get :countries, {:step => 0, :offset => 0}
      expect(response).to be_success
    end

    it "should actually return JSON" do
      get :countries, {:step => 0, :offset => 0}
      lambda { JSON.parse(response.body) }.should_not raise_error
    end

    it "should respect the offset" do
      get :countries, {:step => 2, :offset => 2}
      JSON.parse(response.body)[0]['name'].should eq(@countries[2].name)
    end

    it "should respect the step size" do
      get :countries, {:step => 5, :offset => 0}
      JSON.parse(response.body).length.should eq(5)
    end
  end

end


