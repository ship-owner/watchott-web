import React, { useState } from 'react';

const MovieStreaming = ({ flatrateList, rentList, buyList }) => {
    const [activeTab, setActiveTab] = useState('flatrate');

    const getProviderImage = (logoPath) => {
        return logoPath
            ? `https://image.tmdb.org/t/p/w500${logoPath}`
            : 'https://via.placeholder.com/30x30?text=Logo';
    };

    const renderProviders = (list, type) => {
        if (!list || list.length === 0) {
            return <p className="text-muted">제공되는 {type} 서비스가 없습니다.</p>;
        }
        return (
            list.map(provider => (
                <a key={provider.providerId} className="navbar-brand" href="#" style={{ marginLeft: '6px', fontSize: '17px', fontWeight: '700', lineHeight: '21px', letterSpacing: '-.1px' }}>
                    <img src={getProviderImage(provider.logoPath)} alt={provider.providerName} width="30" height="30" className="d-inline-block align-text-top" />
                    {provider.providerName}
                </a>
            ))
        );
    };

    return (
        <div className="tab-container">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className={`nav-link ${activeTab === 'flatrate' ? 'active' : ''}`}
                        id="nav-flatrate-tab"
                        onClick={() => setActiveTab('flatrate')}
                        type="button"
                        role="tab"
                        aria-controls="nav-flatrate"
                        aria-selected={activeTab === 'flatrate'}
                    >
                        정액제
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'rent' ? 'active' : ''}`}
                        id="nav-rent-tab"
                        onClick={() => setActiveTab('rent')}
                        type="button"
                        role="tab"
                        aria-controls="nav-rent"
                        aria-selected={activeTab === 'rent'}
                    >
                        대여
                    </button>
                    <button
                        className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`}
                        id="nav-buy-tab"
                        onClick={() => setActiveTab('buy')}
                        type="button"
                        role="tab"
                        aria-controls="nav-buy"
                        aria-selected={activeTab === 'buy'}
                    >
                        구매
                    </button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className={`tab-pane fade ${activeTab === 'flatrate' ? 'show active' : ''}`}
                    id="nav-flatrate"
                    role="tabpanel"
                    aria-labelledby="nav-flatrate-tab"
                    tabIndex="0"
                    style={{ marginTop: '5px' }}
                >
                    {renderProviders(flatrateList, '정액제')}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'rent' ? 'show active' : ''}`}
                    id="nav-rent"
                    role="tabpanel"
                    aria-labelledby="nav-rent-tab"
                    tabIndex="0"
                    style={{ marginTop: '5px' }}
                >
                    {renderProviders(rentList, '대여')}
                </div>
                <div
                    className={`tab-pane fade ${activeTab === 'buy' ? 'show active' : ''}`}
                    id="nav-buy"
                    role="tabpanel"
                    aria-labelledby="nav-buy-tab"
                    tabIndex="0"
                    style={{ marginTop: '5px' }}
                >
                    {renderProviders(buyList, '구매')}
                </div>
            </div>
        </div>
    );
};

export default MovieStreaming;