class ChatName
  @names = {}

  class << self
    attr_accessor :names
  end

  include ChatNames::Sanguo
  include ChatNames::Wow
  include ChatNames::Honglou
  include ChatNames::Shuihu
  include ChatNames::Fengshen
  

  def push_names group_name, name_array
    @names[group_name] = name_array
  end

end
