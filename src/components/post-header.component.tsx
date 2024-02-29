import {format} from 'date-fns/format'

interface PostHeaderProps {
		title: string
		date: Date | string
}

export const PostHeader = ({title, date}: PostHeaderProps) => (
		<>
				<h1 className="pt-2 text-4xl font-semibold font-header">{title}</h1>
				<small className="text-gray-500">{format(new Date(date), 'do MMM - yyyy')}</small>
		</>
)
