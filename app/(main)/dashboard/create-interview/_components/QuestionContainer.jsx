import React from 'react'

const QuestionContainer = ({ questionList }) => {

 

    return (
        <div className="max-w-5xl w-full p-4 flex flex-col gap-6">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                Here is your generated questions list
            </h2>

            {/* Questions Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {questionList.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 rounded-2xl bg-white shadow-md border border-gray-100
                     transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                     hover:bg-rose-100 hover:text-black cursor-pointer"
                    >
                        {/* Question Number + Text */}
                        <h2 className="text-lg font-semibold mb-3">
                            Q{index + 1}. {item.question}
                        </h2>

                        {/* Type Badge */}
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full 
                           bg-rose-100 text-rose-700 tracking-wide">
                            {item.type}
                        </span>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default QuestionContainer