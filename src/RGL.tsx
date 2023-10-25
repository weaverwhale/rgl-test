import { useState, useMemo } from 'react'
import RGL, { WidthProvider, Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import './RGL.css'

const initTiles = [...Array(10).keys()].map(
  (_v, i) =>
    ({
      i: i.toString(),
      x: (i * 4) % 12,
      y: (i * 4) % 12,
      w: 4,
      h: 4,
    } as Layout),
)

// This one has an implicit return
export const Rgl = () => {
  const ResponsiveGridLayout = useMemo(() => WidthProvider(RGL), [])
  const [tiles, setTiles] = useState(
    JSON.parse(localStorage.getItem('layout')) ?? (initTiles as Layout[]),
  )

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem('layout')
          setTiles(initTiles)
        }}
      >
        Reset
      </button>
      <button
        style={{ marginLeft: '1em' }}
        onClick={() => {
          const newTile = {
            i: tiles.length.toString(),
            x: (tiles.length * 4) % 12,
            y: tiles.length * 4,
            w: 4,
            h: 4,
          }

          setTiles([...tiles, newTile])
        }}
      >
        Add Tile
      </button>
      <ResponsiveGridLayout
        isDraggable
        isBounded
        onLayoutChange={(l) => {
          localStorage.setItem('layout', JSON.stringify(l))
          setTiles(l)
        }}
        layout={tiles}
        autoSize={true}
        rowHeight={1}
        margin={[16, 16]}
      >
        {tiles.map((tile, i) => (
          <div className="dashboard-item" key={i} data-grid={tile}>
            Dashboard ITEM {i + 1}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Rgl
