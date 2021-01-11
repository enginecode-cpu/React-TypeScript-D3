import React, { useEffect, useRef, useState } from 'react';
import { select, Selection } from 'd3'

const data = [
  {
    units: 150,
    color: 'red'
  },
  {
    units: 100,
    color: 'green'
  },
  {
    units: 50,
    color: 'blue'
  },
  {
    units: 70,
    color: 'teel'
  },
  {
    units: 90,
    color: 'yellowgreen'
  },
]

function Chapter3() {
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
      const rects = selection
        .selectAll('rect')
        .data(data)
        .attr('width', 100)
        .attr('height', d => d.units)
        .attr('fill', d => d.color)
        .attr('x', (_, i) => i * 100)

      rects
        .enter()
        .append('rect')
        .attr('width', 100)
        .attr('height', d => d.units)
        .attr('fill', d => d.color)
        .attr('x', (_, i) => i * 100)
    }
  }, [selection])

  return (
    <div>
      <svg ref={svgRef} width="500" />
    </div>
  );
}

export default Chapter3;