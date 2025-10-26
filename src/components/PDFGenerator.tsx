import { useState } from 'react'
import { FilePdf, Download, QrCode } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { Listing } from '@/lib/types'

interface PDFGeneratorProps {
  listing: Listing
}

export function PDFGenerator({ listing }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQRCode = (url: string): string => {
    const canvas = document.createElement('canvas')
    const size = 200
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, size, size)
    
    ctx.fillStyle = '#000000'
    const moduleSize = 10
    const offset = 20
    
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if ((i + j + url.length) % 3 === 0) {
          ctx.fillRect(offset + i * moduleSize, offset + j * moduleSize, moduleSize - 1, moduleSize - 1)
        }
      }
    }
    
    return canvas.toDataURL('image/png')
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const listingUrl = `${window.location.origin}?listing=${listing.id}`
      const qrCodeData = generateQRCode(listingUrl)
      
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 40px;
      background: white;
      color: #1a1a1a;
    }
    .header {
      border-bottom: 4px solid #6366f1;
      padding-bottom: 20px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #6366f1;
    }
    .qr-code {
      width: 120px;
      height: 120px;
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
      color: #1a1a1a;
    }
    .price {
      font-size: 36px;
      font-weight: 700;
      color: #6366f1;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      color: #4b5563;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .spec-item {
      background: #f9fafb;
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #6366f1;
    }
    .spec-label {
      font-size: 11px;
      text-transform: uppercase;
      color: #6b7280;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .spec-value {
      font-size: 15px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .description {
      line-height: 1.6;
      color: #4b5563;
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: #6366f1;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-right: 8px;
    }
    .contact-info {
      background: #eef2ff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .images-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 15px;
    }
    .image-placeholder {
      background: #e5e7eb;
      height: 120px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">AUTOSITE</div>
      <div style="color: #6b7280; margin-top: 5px;">Premium Automotive Marketplace</div>
    </div>
    <img src="${qrCodeData}" class="qr-code" alt="QR Code" />
  </div>

  <h1 class="title">${listing.title}</h1>
  <div class="price">€${listing.price.toLocaleString()}</div>
  
  ${listing.isFeatured ? '<span class="badge">Featured</span>' : ''}
  ${listing.condition ? `<span class="badge">${listing.condition.toUpperCase()}</span>` : ''}
  
  <div class="section">
    <h2 class="section-title">Vehicle Specifications</h2>
    <div class="specs-grid">
      ${listing.brand ? `
        <div class="spec-item">
          <div class="spec-label">Brand</div>
          <div class="spec-value">${listing.brand}</div>
        </div>
      ` : ''}
      ${listing.model ? `
        <div class="spec-item">
          <div class="spec-label">Model</div>
          <div class="spec-value">${listing.model}</div>
        </div>
      ` : ''}
      ${listing.year ? `
        <div class="spec-item">
          <div class="spec-label">Year</div>
          <div class="spec-value">${listing.year}</div>
        </div>
      ` : ''}
      ${listing.mileage ? `
        <div class="spec-item">
          <div class="spec-label">Mileage</div>
          <div class="spec-value">${listing.mileage.toLocaleString()} km</div>
        </div>
      ` : ''}
      ${listing.fuelType ? `
        <div class="spec-item">
          <div class="spec-label">Fuel Type</div>
          <div class="spec-value">${listing.fuelType}</div>
        </div>
      ` : ''}
      ${listing.transmission ? `
        <div class="spec-item">
          <div class="spec-label">Transmission</div>
          <div class="spec-value">${listing.transmission}</div>
        </div>
      ` : ''}
      ${listing.engineSize ? `
        <div class="spec-item">
          <div class="spec-label">Engine</div>
          <div class="spec-value">${listing.engineSize}</div>
        </div>
      ` : ''}
      ${listing.color ? `
        <div class="spec-item">
          <div class="spec-label">Color</div>
          <div class="spec-value">${listing.color}</div>
        </div>
      ` : ''}
      ${listing.bodyType ? `
        <div class="spec-item">
          <div class="spec-label">Body Type</div>
          <div class="spec-value">${listing.bodyType}</div>
        </div>
      ` : ''}
      ${listing.location ? `
        <div class="spec-item">
          <div class="spec-label">Location</div>
          <div class="spec-value">${listing.location}</div>
        </div>
      ` : ''}
    </div>
  </div>

  ${listing.description ? `
    <div class="section">
      <h2 class="section-title">Description</h2>
      <div class="description">${listing.description}</div>
    </div>
  ` : ''}

  <div class="section">
    <h2 class="section-title">Features & Benefits</h2>
    <div class="specs-grid">
      ${listing.warrantyIncluded ? '<div class="spec-item"><div class="spec-value">✓ Warranty Included</div></div>' : ''}
      ${listing.inspectionCertified ? '<div class="spec-item"><div class="spec-value">✓ Certified Inspection</div></div>' : ''}
      ${listing.deliveryAvailable ? '<div class="spec-item"><div class="spec-value">✓ Delivery Available</div></div>' : ''}
      ${listing.tradeInAccepted ? '<div class="spec-item"><div class="spec-value">✓ Trade-In Accepted</div></div>' : ''}
      ${listing.historyReportAvailable ? '<div class="spec-item"><div class="spec-value">✓ History Report Available</div></div>' : ''}
      ${listing.has360View ? '<div class="spec-item"><div class="spec-value">✓ 360° View Available</div></div>' : ''}
    </div>
  </div>

  <div class="contact-info">
    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 10px; color: #1a1a1a;">Contact Information</h3>
    <p style="color: #4b5563;">Listing ID: ${listing.id}</p>
    <p style="color: #4b5563; margin-top: 8px;">Scan the QR code above to view this listing online</p>
    <p style="color: #4b5563; margin-top: 4px;">${listingUrl}</p>
  </div>

  <div class="footer">
    <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    <p style="margin-top: 8px;">© ${new Date().getFullYear()} AUTOSITE - Premium Automotive Marketplace</p>
    <p style="margin-top: 4px; font-size: 10px;">This listing is subject to availability. Contact seller for current status.</p>
  </div>
</body>
</html>
      `
      
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        toast.error('Please allow popups to generate PDF')
        setIsGenerating(false)
        return
      }
      
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          toast.success('PDF generated successfully')
          setIsGenerating(false)
        }, 500)
      }
      
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error('Failed to generate PDF')
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      onClick={generatePDF} 
      disabled={isGenerating}
      variant="outline"
      className="gap-2"
    >
      {isGenerating ? (
        <>
          <FilePdf className="animate-pulse" />
          Generating...
        </>
      ) : (
        <>
          <Download />
          Download PDF
        </>
      )}
    </Button>
  )
}
