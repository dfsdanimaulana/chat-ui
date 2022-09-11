import { useWindowDimensions } from '../../hooks/useWindowDimensions'

export default function PostGridPlaceholder() {
    const { width } = useWindowDimensions()
    const cardStyles = (w) => {
        return {
            height: w < 768 ? '100px' : '200px',
            width: '100%'
        }
    }
    return (
        <>
            <div className="row text-center placeholder-glow justify-content-center mb-3">
                <span className="placeholder col-1 mx-3 rounded"></span>
                <span className="placeholder col-1 mx-3 rounded"></span>
                <span className="placeholder col-1 mx-3 rounded"></span>
            </div>
            <div className="row placeholder-glow">
                {[1, 1, 1, 1, 1, 1].map((_, i) => (
                    <div key={i} className="col-4 mb-3">
                        <div className="placeholder col-1 rounded" style={cardStyles(width)}></div>
                    </div>
                ))}
            </div>
        </>
    )
}
