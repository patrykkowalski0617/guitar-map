import styled from "styled-components";

export const LibraryWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CategoryTitle = styled.h2`
  font-size: 1.2rem;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ShapesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const ShapeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ShapeLabel = styled.span`
  font-size: 10px;
  color: #94a3b8;
  margin-top: 8px;
  font-weight: 600;
`;
