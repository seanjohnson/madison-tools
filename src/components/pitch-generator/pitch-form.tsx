'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'

export function PitchGenerator() {
  const [formData, setFormData] = useState({
    profession: '',
    targetClient: '',
    outcome: '',
    differentiator: ''
  })
  
  const [generatedPitch, setGeneratedPitch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const generatePitch = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      })

      if (!response.ok) throw new Error('Failed to generate pitch')
      
      const data = await response.json()
      setGeneratedPitch(data.pitch)
    } catch (err) {
      setError('Failed to generate pitch. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Services Elevator Pitch Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="profession">What's your profession?</Label>
          <Input
            id="profession"
            name="profession"
            placeholder="e.g. accountant, consultant, lawyer"
            value={formData.profession}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="targetClient">Who do you serve?</Label>
          <Input
            id="targetClient"
            name="targetClient"
            placeholder="e.g. manufacturing companies, tech startups"
            value={formData.targetClient}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="outcome">What outcome do you deliver?</Label>
          <Input
            id="outcome"
            name="outcome"
            placeholder="e.g. become more profitable, reduce legal risk"
            value={formData.outcome}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="differentiator">What makes your approach unique? (optional)</Label>
          <Input
            id="differentiator"
            name="differentiator"
            placeholder="e.g. proprietary methodology, industry expertise"
            value={formData.differentiator}
            onChange={handleInputChange}
          />
        </div>
        
        <Button 
          onClick={generatePitch}
          className="w-full"
          disabled={!formData.profession || !formData.targetClient || !formData.outcome || isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Pitch'}
        </Button>
        
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        {generatedPitch && (
          <div className="mt-6 p-4 bg-slate-100 rounded-md">
            <h3 className="font-semibold mb-2">Your Elevator Pitch:</h3>
            <p className="text-lg">{generatedPitch}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}