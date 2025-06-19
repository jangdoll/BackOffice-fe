import { useState, type FC, type ChangeEvent } from 'react';

// Note: In a real application, you would fetch this from a server.
// These are placeholders based on the JSP's resourceMap.
const resourceMap: { [key: string]: string } = {
  Str: '점',
  StoreBrand: '브랜드',
  BrandType: '브랜드유형',
  StoreSingleItem: '점단품',
  Partners: '협력사',
  SingleItemList: '단품 목록',
  ScanPLUCode: '스캔(PLU)코드',
  AddRow: '행추가',
  DeleteRow: '행삭제',
  Save: '저장',
  Search: '조회',
  SingleItem: '단품',
  List: '목록',
  Scan: '스캔',
  PLU: '(PLU)',
  Code: '코드',
};

// Interface for the form state
interface FormState {
  bizloc_cd: string;
  pumbun_cd: string;
  pumbun_nm: string;
  pumbun_tp: string;
  gds_cd: string;
  gds_nm: string;
  ven_cd: string;
  ven_nm: string;
}

// Component for managing product scan codes
const ProductScanCodeManage: FC = () => {
  // State management logic for the form
  const [formState, setFormState] = useState<FormState>({
    bizloc_cd: '',
    pumbun_cd: '',
    pumbun_nm: '',
    pumbun_tp: '',
    gds_cd: '',
    gds_nm: '',
    ven_cd: '',
    ven_nm: '',
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handler functions for various actions
  const handleSearch = (type: string) => {
    console.log(`Searching for ${type} with value:`, formState);
  };

  const handlePageSearch = () => console.log('조회 button clicked');
  const handlePageSave = () => console.log('저장 button clicked');

  const handleAddRow = () => console.log('Add Row clicked');
  const handleDeleteRow = () => console.log('Delete Row clicked');

  return (
    <div className="product-scan-code-page">
      <style>{`
                /* Basic Styling */
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f5f7;
                    color: #333;
                }
                .product-scan-code-page {
                    padding: 15px;
                }
                .page-top-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }
                .page-top-bar h1 {
                    font-size: 20px;
                    margin: 0;
                }
                .page-action-buttons .btn {
                    background-color: #e9e9e9;
                }

                .page-header {
                    background-color: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 15px;
                    border: 1px solid #e0e0e0;
                }
                .search-form .form-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 10px;
                }
                 .search-form .form-row:last-child {
                    margin-bottom: 0;
                }
                .form-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                }
                .form-group label {
                    font-weight: 600;
                    font-size: 14px;
                    white-space: nowrap;
                    color: #555;
                    min-width: 70px; /* Label width consistency */
                }
                .form-control {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 14px;
                }
                 .input-group {
                    display: flex;
                    width: 100%;
                }
                .input-group .form-control {
                    border-right: none;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
                .input-group .btn {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    border-left: none;
                    background-color: #f0f0f0;
                }
                /* Horizontal Layout for Panels */
                .main-content-layout {
                    display: flex;
                    flex-direction: row; /* Arrange children horizontally */
                    gap: 15px;
                    align-items: stretch; /* Make panels of equal height */
                }
                .left-panel {
                   flex: 1; /* Give panels flexible width */
                }
                .right-panel {
                    flex: 1; /* Give panels flexible width */
                }
                .panel {
                  background-color: #fff;
                  border-radius: 8px;
                  border: 1px solid #e0e0e0;
                  height: 100%;
                  display: flex;
                  flex-direction: column;
                }
                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 15px;
                    border-bottom: 1px solid #e0e0e0;
                    flex-shrink: 0;
                }
                .panel-header h2 {
                    font-size: 16px;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .btn {
                    padding: 6px 12px;
                    font-size: 14px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    margin-left: 5px;
                }
                .btn:hover {
                    background-color: #e0e0e0;
                }
                .button-group-right .btn {
                     background-color: #f0f0f0;
                }
                .grid-placeholder {
                    height: 600px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    font-size: 18px;
                    background-color: #fafafa;
                    flex-grow: 1;
                }
                 /* Simple icon placeholders */
                .icon {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                }
                .cqc-list::before { content: "📋"; }
                .cqc-circle-with-plus::before { content: "➕"; }
                .cqc-circle-with-minus::before { content: "➖"; }

            `}</style>

      {/* Page Title and Global Action Buttons */}
      <div className="page-top-bar">
        <h1>단품 스캔 코드 관리</h1>
        <div className="page-action-buttons">
          <button type="button" className="btn" onClick={handlePageSearch}>{resourceMap.Search}</button>
          <button type="button" className="btn" onClick={handlePageSave}>{resourceMap.Save}</button>
        </div>
      </div>

      {/* Header section for search filters */}
      <header className="page-header">
        <form className="search-form">
          <div className="form-row">
            {/* 점 */}
            <div className="form-group">
              <label htmlFor="cbBizlocOrgCd_sch">{resourceMap.Str}</label>
              <select
                id="cbBizlocOrgCd_sch"
                name="bizloc_cd"
                className="form-control"
                value={formState.bizloc_cd}
                onChange={handleFormChange}
              >
                <option value="">-- 선택 --</option>
                <option value="1">영업1팀</option>
                <option value="2">영업2팀</option>
              </select>
            </div>
            {/* 브랜드 */}
            <div className="form-group">
              <label htmlFor="pumbunCd_sch">{resourceMap.StoreBrand}</label>
              <div className="input-group">
                <input
                  type="text"
                  id="pumbunCd_sch"
                  name="pumbun_cd"
                  className="form-control"
                  value={formState.pumbun_cd}
                  onChange={handleFormChange}
                />
                <button type="button" className="btn" onClick={() => handleSearch('brand')}>🔍</button>
              </div>
            </div>
            {/* 브랜드유형 */}
            <div className="form-group">
              <label htmlFor="cbPumbunTp_sch">{resourceMap.BrandType}</label>
              <select
                id="cbPumbunTp_sch"
                name="pumbun_tp"
                className="form-control"
                value={formState.pumbun_tp}
                onChange={handleFormChange}
              >
                <option value="">-- 전체 --</option>
                <option value="A">타입 A</option>
                <option value="B">타입 B</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            {/* 점단품 */}
            <div className="form-group">
              <label htmlFor="gdsCd_sch">{resourceMap.StoreSingleItem}</label>
              <div className="input-group">
                <input
                  type="text"
                  id="gdsCd_sch"
                  name="gds_cd"
                  className="form-control"
                  value={formState.gds_cd}
                  onChange={handleFormChange}
                />
                <button type="button" className="btn" onClick={() => handleSearch('gds')}>🔍</button>
              </div>
            </div>
            {/* 협력사 */}
            <div className="form-group">
              <label htmlFor="venCd_sch">{resourceMap.Partners}</label>
              <div className="input-group">
                <input
                  type="text"
                  id="venCd_sch"
                  name="ven_cd"
                  className="form-control"
                  value={formState.ven_cd}
                  onChange={handleFormChange}
                />
                <button type="button" className="btn" onClick={() => handleSearch('ven')}>🔍</button>
              </div>
            </div>
            {/* Empty group for spacing */}
            <div className="form-group"></div>
          </div>
        </form>
      </header>

      {/* Main Content section with two horizontal panels */}
      <div className="main-content-layout">
        {/* Left Panel for Product List */}
        <div className="left-panel">
          <div className="panel">
            <div className="panel-header">
              <h2>
                <i className="icon cqc-list"></i>
                {resourceMap.SingleItemList}
              </h2>
            </div>
            <div className="grid-placeholder">
              <p>상품 목록 그리드 영역</p>
            </div>
          </div>
        </div>
        {/* Right Panel for Scan Code Management */}
        <div className="right-panel">
          <div className="panel">
            <div className="panel-header">
              <h2>
                <i className="icon cqc-list"></i>
                {resourceMap.ScanPLUCode}
              </h2>
              <div className="button-group-right">
                <button type="button" className="btn" onClick={handleAddRow}>
                  <i className="icon cqc-circle-with-plus"></i> {resourceMap.AddRow}
                </button>
                <button type="button" className="btn" onClick={handleDeleteRow}>
                  <i className="icon cqc-circle-with-minus"></i> {resourceMap.DeleteRow}
                </button>
              </div>
            </div>
            <div className="grid-placeholder">
              <p>스캔(PLU)코드 그리드 영역</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScanCodeManage;
