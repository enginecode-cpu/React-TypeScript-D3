import React, { useEffect, useRef } from 'react';
import { select } from 'd3'

function Chapter1() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = select(svgRef.current)

    svg
      .append('rect')
    svg
      .append('rect')
    svg
      .append('rect')

    svg
      .selectAll('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'blue')
      .attr('x', (_, i) => i * 100)
  }, [])

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default Chapter1;