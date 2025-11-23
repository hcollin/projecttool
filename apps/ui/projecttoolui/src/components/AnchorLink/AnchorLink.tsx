import { Anchor, type AnchorProps } from "@mantine/core";
import { Link, type LinkProps } from "@tanstack/react-router";

interface AnchorLinkProps extends AnchorProps, LinkProps {
	children: React.ReactNode;
}

const AnchorLink = (props: AnchorLinkProps) => {
	const { style, to, params, c, children } = props;

	return (
		<Anchor
			style={style}
			c={c || undefined}
			renderRoot={({ className, ...others }) => {
				return (
					<Link to={to} params={params} className={className} {...others}>
						{children}
					</Link>
				);
			}}
		/>
	);
};

export default AnchorLink;
