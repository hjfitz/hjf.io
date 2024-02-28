
export const JSONOutput = ({obj}: {obj: Record<string, any>}) => (
		<pre>{JSON.stringify(obj, null, 2)}</pre>
)
