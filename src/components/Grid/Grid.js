/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import {
	ContainerGutter,
	Breakpoints,
  ColumnCount,
  ContainerSize,
  SmallContainerSize
} from "../../emotion/variables"
import { rem } from "../../emotion/helpers"

const ContainerBase = ({ flush }) => css`
	width: 100%;
	padding-left: ${flush ? 0 : rem(ContainerGutter)};
	padding-right: ${flush ? 0 : rem(ContainerGutter)};
	margin-right: auto;
	margin-left: auto;
`

export const Grid = styled.div`
	display: flex;
	flex-flow: row wrap;
	margin-right: ${(props) => (props.flush ? 0 : rem(ContainerGutter * -1))};
	margin-left: ${(props) => (props.flush ? 0 : rem(ContainerGutter * -1))};
`

export const Container = styled.div`
	max-width: ${(props) => (props.full ? '100%' : rem(ContainerSize))};
	${ContainerBase}
`

export const ContainerSmall = styled.div`
	max-width: ${rem(SmallContainerSize)};
	${ContainerBase}
`

export const Column = ({
	children,
	width,
	offset,
	flush,
	query,
	flex,
	onlyFlex,
}) => {
	/**
	 * Constructs the @media css declaration
	 *
	 * @param {string} queryType Type of media query - min or max
	 * @param {number} size size of media query
	 */
	const getMediaQuery = (queryType, size) => {
		const querySize = queryType === "min" ? size : size - 1
		return `@media (${queryType}-width: ${querySize}px)`
	}

	/**
	 * Calculates the amount of space a property spans
	 *
	 * @param {string} prop CSS property to calculate
	 * @param {number} value number of columns the property spans
	 */
	const getCalcValue = (prop, value) =>
		`${prop}: calc((100% / ${ColumnCount}) * ${value});`

	/**
	 *
	 * @param {string} queryType Type of media query - min or max
	 * @param {number} size size of media query
	 * @param {string} prop CSS property to calculate
	 * @param {number} value number of columns the property spans
	 */
	const constructMediaQuery = (queryType, size, prop, value) =>
		`${getMediaQuery(queryType, size)} {
			${getCalcValue(prop, value)}
		}`

	const compareOffsetAndWidth = (offsetVal, widthVal) => {
		if (offsetVal > widthVal) {
			throw new Error(
				`"offset" value can't be bigger than the "width" value. ${offsetVal} > ${widthVal}`
			)
		}
	}

	const isValidOffsetValue = (offsetVal) => {
		if (
			(typeof offsetVal === "number" && offsetVal !== 0) ||
			(typeof offsetVal === "object" && Object.keys(offsetVal).length !== 0)
		) {
			return true
		}

		return false
	}

	const getWidthValue = (value) => {
		const type = typeof value
		let w = ""

		switch (type) {
			case "object":
				w = Object.keys(value)
					.map((key) => {
						return constructMediaQuery(
							query,
							Breakpoints[key],
							"max-width",
							value[key]
						)
					})
					.join("")
				break
			case "number":
			default:
				w = getCalcValue("max-width", value)
				break
		}

		return w
	}

	const getOffsetValue = (value, widthVal = width) => {
		const type = typeof value
		let off = ""

		compareOffsetAndWidth(value, widthVal)

		switch (type) {
			case "object":
				if (isValidOffsetValue(value)) {
					off = Object.keys(value)
						.map((key) => {
							compareOffsetAndWidth(value[key], widthVal)
							return constructMediaQuery(
								query,
								Breakpoints[key],
								"margin-left",
								value[key]
							)
						})
						.join("")
				}
				break
			case "number":
			default:
				if (isValidOffsetValue(value)) {
					off = getCalcValue("margin-left", value)
				}
				break
		}

		return off
	}

	const renderFlexProperties = () => {
		if (Object.keys(flex).length > 0) {
			return Object.keys(flex)
				.reduce(
					(previousValue, currentValue) =>
						`${previousValue} ${currentValue}: ${flex[currentValue]};`,
					""
				)
				.trim()
		}

		return ""
	}

	let widthProp = width
	const offsetProp = offset

	if (typeof widthProp === "number" && typeof offsetProp === "number") {
		if (widthProp === 12 && offsetProp !== 0) {
			widthProp -= offsetProp
		}
	}

	const widthValue = getWidthValue(widthProp)
	const offsetValue = getOffsetValue(offsetProp, widthProp)

	return (
		<div
			css={css`
				width: 100%;
				padding-right: ${flush ? 0 : rem(ContainerGutter)};
				padding-left: ${flush ? 0 : rem(ContainerGutter)};
				${onlyFlex ? `` : `${widthValue} ${offsetValue}`}
				${renderFlexProperties()}
			`}
		>
			{children}
		</div>
	)
}

Column.defaultProps = {
	width: 12,
	offset: 0,
	flush: false,
	query: "min",
	flex: {},
	onlyFlex: false,
}

Column.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	offset: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	flush: PropTypes.bool,
	query: PropTypes.oneOf(["min", "max"]),
	// eslint-disable-next-line react/forbid-prop-types
	flex: PropTypes.object,
	onlyFlex: PropTypes.bool,
}
