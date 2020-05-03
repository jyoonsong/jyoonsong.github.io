module Jekyll
  module Algolia
    module Hooks
    	Jekyll::Hooks.register :posts, :pre_render do |doc|
			  content = doc.content
			  if content.length > 150
			    content = content[0..150]
			  end
			  doc.data['excerpt'] = content
			end
    end
  end
end