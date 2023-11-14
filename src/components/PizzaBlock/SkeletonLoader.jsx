import { Skeleton } from '@mui/material'

const SkeletonLoader = () => {
  return (
    <div className="skeleton-box">
      <Skeleton className="skeleton-box__img" variant="circular" width={250} height={250} />
      <Skeleton className="skeleton-box__title" variant="rounded" width={180} height={30} />
      <Skeleton className="skeleton-box__descr" variant="rounded" width={260} height={50} />
      <Skeleton className="skeleton-box__info" variant="rounded" width={260} height={60} />
      <div className="skeleton-box__bottom">
        <Skeleton
          className="skeleton-box__bottom-price"
          variant="rounded"
          width={100}
          height={30}
        />
        <Skeleton
          className="skeleton-box__bottom-quant"
          variant="rounded"
          width={140}
          height={45}
        />
      </div>
    </div>
  )
}
export default SkeletonLoader
