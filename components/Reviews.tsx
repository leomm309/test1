import { Star,TrendingUp  } from 'lucide-react'
import Link from 'next/link'

const reviews = [
  { id: 1, name: "John Doe", rating: 5, comment: "Excellent service! Fast and secure transactions." },
  { id: 2, name: "Jane Smith", rating: 4, comment: "Great platform, but could use more coin options." },
  { id: 3, name: "Mike Johnson", rating: 5, comment: "Best exchange rates I've found. Highly recommended!" },
  { id: 4, name: "Sarah Williams", rating: 4, comment: "User-friendly interface and responsive support team." },
]

const ReviewCard = ({ name, rating, comment }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="ml-2 font-semibold text-[#45206C]">{name}</span>
    </div>
    <p className="text-gray-600">{comment}</p>
  </div>
)

const TrustpilotRating = () => (
  <div className="bg-gradient-to-r from-[#00b67a] to-[#00d084] p-1 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
  <div className="bg-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
      <div className="flex items-center">
        <span className="text-2xl font-bold text-[#00b67a] mr-2">Excellent</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${i < 4 ? 'text-[#00b67a] fill-[#00b67a]' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <span className="text-gray-600 text-sm mt-1">Based on <strong>11,450</strong> reviews</span>
    </div>
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
      <TrendingUp className="w-5 h-5 text-[#00b67a] mr-2" />
      <span className="text-gray-700 font-semibold">Trust Score 4.8</span>
    </div>
  </div>
  <div className="mt-2 flex justify-between items-center px-6">
    <Link className="text-white-600 font-bold text-lg" href="https://www.trustpilot.com">
  Trustpilot
  </Link>
  <Link className="text-white text-sm hover:underline" href="https://www.trustpilot.com/review/rl.exchange">
  View our reviews
  </Link>
  </div>
</div>
)

export default function Reviews() {
  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#45206C] mb-8 md:mb-12 text-center">What Our Customers Say</h2>
        <TrustpilotRating />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}