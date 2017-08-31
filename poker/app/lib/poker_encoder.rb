class PokerEncoder
  CODE_MAP = YAML.load_file(Rails.root.join('config/alphabet_map.yml'))

  def self.encode(str)
    converted = Base64.urlsafe_encode64(str)
    converted_for_display = converted.tr('^A-Za-z0-9', '')
    converted_for_display.tr(CODE_MAP['ALPHABET'], CODE_MAP['ENCODING'])
  end

  def self.decode(coded_str)
    reversed = coded_str.to_s.tr(CODE_MAP['ENCODING'], CODE_MAP['ALPHABET'])
    Base64.urlsafe_decode64(reversed)
  end
end