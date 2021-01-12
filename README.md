# React TypeScript D3
## 1. 프로젝트 시작하기

```
yarn create react-app ts-react-d3 --typescript
```

<br>

## 2. 필요한 라이브러리 설치하기

```
yarn add d3 @types/d3 randomstring @types/randomstring styled-components @types/styled-components  
```

<br>

## 3. 시작하기
```tsx
import React, { useEffect, useRef } from 'react';
import { select } from 'd3'

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = select(svgRef.current)
  }, [])

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default App;
```
`useRef`에 제네릭 타입을 작성하지 않으면 오류가 발생한다.