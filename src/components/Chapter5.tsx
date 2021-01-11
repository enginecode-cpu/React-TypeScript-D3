import React, { useEffect, useRef, useState } from 'react';
import { max, scaleBand, scaleLinear, select, Selection } from 'd3';

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
  height: 900
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
  const x = scaleBand()
  const y = scaleLinear().domain([0, maxValue!]).range([0, dimensions.height])
  useEffect(() => {
    if (!selection) {
      const svg = svgRef.current
      setSelection(select(svg))
    } else {

    }
  }, [selection])

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default Chapter5;