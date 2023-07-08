import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="143" cy="137" r="136" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="77" />
    <rect x="1" y="443" rx="10" ry="10" width="95" height="30" />
    <rect x="122" y="440" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton
