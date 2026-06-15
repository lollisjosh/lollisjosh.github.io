import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function WakaTimePieChart({ source, ariaLabel }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const abortController = new AbortController()

    if (!canvas || !source?.url) {
      return undefined
    }

    async function loadChartData() {
      try {
        const response = await fetch(source.url, {
          signal: abortController.signal,
        })

        const chartData = await response.json()

        if (abortController.signal.aborted) {
          return
        }

        const labels = chartData.data.map((item) => item.name)
        const dataValues = chartData.data.map((item) => item.percent)
        const backgroundColors = chartData.data.map((item) => item.color)
        const timeSpent = chartData.data.map((item) => item.text)

        chartRef.current?.destroy()

        chartRef.current = new Chart(canvas, {
          type: 'pie',
          data: {
            labels,
            datasets: [
              {
                data: dataValues,
                backgroundColor: backgroundColors,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label(context) {
                    const label = context.label ? `${context.label}: ` : ''
                    const time = timeSpent[context.dataIndex]

                    return `${label}${context.raw.toFixed(2)}% (${time})`
                  },
                },
              },
            },
          },
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching WakaTime data for chart', error)
        }
      }
    }

    loadChartData()

    return () => {
      abortController.abort()
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [source])

  return <canvas ref={canvasRef} aria-label={ariaLabel} role="img" />
}

export default WakaTimePieChart