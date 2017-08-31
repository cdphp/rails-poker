class ChatName
  @names = {}

  class << self
    attr_accessor :names
  end

  include ChatNames::Sanguo
  include ChatNames::Honglou
  include ChatNames::Shuihu

  
  def push_names group_name, name_array
    @names[group_name] = name_array
  end

end