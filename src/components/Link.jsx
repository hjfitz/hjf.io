import React from 'react'
import {Link as GatsbyLink} from 'gatsby'

const Link = (props) => {
	if ('href' in props && props.href.indexOf('/') === 0) {
		return <GatsbyLink {...props} to={props.href} />
	}
	return <a {...props} />
}

export default Link
