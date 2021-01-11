import React, { useEffect, useRef, useState } from 'react';
import { select, Selection, scaleLinear, scaleBand, max, axisBottom, axisLeft } from 'd3';

type Data = {
  name: string,
  number: number
}

const data: Data[] = [
  {
    name: 'foo',
    number: 9000
  },
  {
    name: 'bar',
    number: 2340
  },
  {
    name: 'baz',
    number: 3463
  },
  {
    name: 'hoge',
    number: 7654
  },
  {
    name: 'piyo',
    number: 8746
  },
]

const dimesions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100
}

function Chapter4() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] =
    useState<null | Selection<
      SVGSVGElement |
      null,
      unknown,
      null,
      undefined
    >>(null)

  const maxValue = max(data, d => d.number)
  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimesions.chartWidth])
    .paddingInner(0.05)
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([0, dimesions.chartHeight])

  const xAxis = axisBottom(x)
  const yAxis = axisLeft(y).ticks(3).tickFormat(d => `${d}`)


  useEffect(() => {
    if (!selection) {
      const svg = svgRef.current
      setSelection(select(svg))
    } else {
      const xAxisG = selection
        .append('g')
        .attr('transform', `translate(${dimesions.marginLeft}, ${dimesions.chartHeight})`)
        .call(xAxis)
      const yAxisG = selection
        .append('g')
        .attr('transform', `translate(${dimesions.marginLeft}, 0)`)
        .call(yAxis)
      selection
        .append('g')
        .attr('transform', `translate(${dimesions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', 'orange')
        .attr('height', d => y(d.number))
    }
  }, [selection])

  return (
    <div>
      <svg ref={svgRef} width={dimesions.width} height={dimesions.height} />
    </div>
  );
}

export default Chapter4;