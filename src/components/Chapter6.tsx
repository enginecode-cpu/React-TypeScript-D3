import React, { useEffect, useRef, useState } from 'react';
import { easeElastic, max, scaleBand, scaleLinear, select, Selection } from 'd3';
import randomstring from 'randomstring'


type Data = {
  name: string
  units: number
}
const initialData: Data[] = [
  {
    name: 'foo',
    units: 32
  },
  {
    name: 'bar',
    units: 67
  },
  {
    name: 'baz',
    units: 81
  },
  {
    name: 'hoge',
    units: 38
  },
  {
    name: 'piyo',
    units: 28
  },
  {
    name: 'hogera',
    units: 59
  },
]

const dimensions = {
  width: 900,
  height: 400
}

function Chapter5() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selection, setSelection] =
    useState<null | Selection<
      SVGSVGElement |
      null,
      unknown,
      null,
      undefined
    >>(null)

  const [data, setData] = useState(initialData)

  const maxValue = max(data, d => (d.units))
  let x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.width])
    .paddingInner(0.08)
  let y = scaleLinear()
    .domain([0, maxValue!])
    .range([dimensions.height, 0])

  useEffect(() => {
    if (!selection) {
      const svg = svgRef.current
      setSelection(select(svg))
    } else {
      selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('x', d => x(d.name)!)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .transition()
        .duration(500)
        .delay((_, i) => i * 100)
        .ease(easeElastic)
        .attr('height', d => dimensions.height - y(d.units))
        .attr('y', d => y(d.units))
    }
    // eslint-disable-next-line
  }, [selection])

  useEffect(() => {
    if (selection) {
      // eslint-disable-next-line
      x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width])
        .paddingInner(0.08)

      // eslint-disable-next-line
      y = scaleLinear()
        .domain([0, maxValue!])
        .range([dimensions.height, 0])

      const rects = selection.selectAll('rect').data(data)

      rects
        .exit()
        .transition()
        .duration(300)
        .attr('height', 0)
        .attr('y', dimensions.height)
        .remove()

      rects
        .transition()
        .duration(300)
        .attr('width', x.bandwidth)
        .attr('height', d => dimensions.height - y(d.units))
        .attr('x', d => x(d.name)!)
        .attr('y', d => y(d.units))
        .attr('fill', 'orange')

      rects
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', 'orange')
        .attr('height', 0)
        .attr('y', dimensions.height)
        .transition()
        .duration(500)
        .ease(easeElastic)
        .delay(200)
        .attr('height', d => dimensions.height - y(d.units))
        .attr('y', d => y(d.units))
    }
  }, [data])

  const addRandom = () => {
    const dataToBeAdded: Data = {
      name: randomstring.generate(10),
      units: Math.floor(Math.random() * (80) + 20)
    }

    setData([...data, dataToBeAdded])
  }

  const removeLast = () => {
    if (data.length === 0) return
    const slicedData = data.slice(0, data.length - 1)
    setData(slicedData)
  }

  return (
    <div>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      />
      <button onClick={addRandom}>Add Random</button>
      <button onClick={removeLast}>Remove Last</button>
    </div>
  );
}

export default Chapter5;