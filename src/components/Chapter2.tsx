import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3'

const data = [{ width: 200, height: 100, color: "orange" }]

function Chapter2() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const [selection, setSelection] =
    useState<null | Selection<
      SVGSVGElement |
      null,
      unknown,
      null,
      undefined
    >>(null)

  useEffect(() => {
    if (!selection) {
      const svg = svgRef.current
      setSelection(select(svg))
    } else {
      selection
        .data(data)
        .append('rect')
        .attr('width', (d) => d.width)
        .attr('height', (d) => d.height)
        .attr('fill', (d) => d.color)
    }
  }, [selection])

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default Chapter2;