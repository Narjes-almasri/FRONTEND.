class SiteDataCollector {
  
  static collectAllData() {
    const userProfile = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
    const selectedPalette = JSON.parse(sessionStorage.getItem('selectedPalette') || '{}');
    const generatedLogo = sessionStorage.getItem('generatedLogo');
    const uploadedLogo = sessionStorage.getItem('uploadedLogo');
    const logo = generatedLogo || uploadedLogo || null;
    const appName = sessionStorage.getItem('appName') || '';
    const catalog = sessionStorage.getItem('selectedCatalog') || 'modern';
    const productPage = sessionStorage.getItem('selectedProductPage') || 'grid';
    const pageContent = JSON.parse(sessionStorage.getItem('pageContent') || '{}');
    const pageImages = JSON.parse(sessionStorage.getItem('pageImages') || '{}');
    const logoSize = Number(sessionStorage.getItem('logoSize') || 0) || null;
    const logoBorderRadius = Number(sessionStorage.getItem('logoBorderRadius') || 0) || null;
    const logoViewerZoom = Number(sessionStorage.getItem('logoViewerZoom') || 1) || null;
    const logoViewerOffsetX = Number(sessionStorage.getItem('logoViewerOffsetX') || 0) || null;
    const logoViewerOffsetY = Number(sessionStorage.getItem('logoViewerOffsetY') || 0) || null;
    const adminEvaluationRequested = sessionStorage.getItem('adminEvaluationRequested') === 'true';
    const adminEvaluationRequestedAt = sessionStorage.getItem('adminEvaluationRequestedAt') || null;

    const user = {
      name: sessionStorage.getItem('userName') || sessionStorage.getItem('username') || '',
      email: sessionStorage.getItem('userEmail') || ''
    };

    const logoMeta = (() => {
      if (!logo) return null;
      const type = generatedLogo ? 'generated' : 'uploaded';
      const mimeMatch = String(logo).match(/^data:([^;]+);base64,/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      const sizeKB = Math.round((logo.length * 3 / 4) / 1024);
      return { type, mime, data: logo, sizeKB };
    })();

    return {
      meta: {
        version: '1.0',
        timestamp: new Date().toISOString(),
        source: 'TapToBuild-Frontend',
        env: 'web'
      },
      user,
      profile: {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        websiteName: userProfile.websiteName || userProfile.businessName || appName || '',
        phone: userProfile.phone || ''
      },
      website: {
        appName: appName || (userProfile.websiteName || ''),
        catalog: catalog,
        productLayout: productPage
      },
      branding: {
        palette: {
          name: selectedPalette.name || 'Custom',
          description: selectedPalette.description || '',
          colors: selectedPalette.colors || []
        },
        logo: logoMeta,
        settings: {
          logoSize: logoSize,
          logoBorderRadius: logoBorderRadius
        },
        viewer: {
          zoom: logoViewerZoom,
          offsetX: logoViewerOffsetX,
          offsetY: logoViewerOffsetY
        }
      },
      assets: {
        content: pageContent,
        images: pageImages
      },
      flags: {
        adminEvaluationRequested,
        adminEvaluationRequestedAt
      },
      summary: {
        businessName: userProfile.websiteName || userProfile.businessName || appName || '',
        appName: appName || '',
        paletteColors: Array.isArray(selectedPalette.colors) ? selectedPalette.colors.length : 0,
        hasLogo: !!logo
      }
    };
  }

 
  static getDataForDisplay() {
    const data = this.collectAllData();
    const displayData = JSON.parse(JSON.stringify(data));
    if (displayData.branding && displayData.branding.logo && displayData.branding.logo.data) {
      const kb = Math.round((displayData.branding.logo.data.length * 3 / 4) / 1024);
      displayData.branding.logo.data = `(Base64 image data - ${kb}KB)`;
    }
    return displayData;
  }


  static downloadAsJSON(filename = null) {
    const data = this.collectAllData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `site-config-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async sendToBackend(apiEndpoint, options = {}) {
    const data = this.collectAllData();
    const defaultOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(apiEndpoint, {
        ...defaultOptions,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return {
        success: true,
        data: result,
        message: 'Data sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `Error sending data: ${error.message}`
      };
    }
  }


  static getFormattedJSON() {
    const data = this.collectAllData();
    const displayData = JSON.parse(JSON.stringify(data));
    if (displayData.branding && displayData.branding.logo && displayData.branding.logo.data) {
      const kb = Math.round((displayData.branding.logo.data.length * 3 / 4) / 1024);
      displayData.branding.logo.data = `(Base64 image data - ${kb}KB)`;
    }
    return JSON.stringify(displayData, null, 2);
  }

  static getSummary() {
    const data = this.collectAllData();
    return {
      businessName: data.profile.websiteName,
      appName: data.website.appName,
      catalogStyle: data.website.catalog,
      productLayout: data.website.productLayout,
      paletteColors: Array.isArray(data.branding.palette.colors) ? data.branding.palette.colors.length : 0,
      hasLogo: !!(data.branding.logo && data.branding.logo.data),
      timestamp: data.meta && data.meta.timestamp ? data.meta.timestamp : new Date().toISOString()
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SiteDataCollector;
}
