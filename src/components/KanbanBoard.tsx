import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- TYPE DEFINITIONS ---
type ColumnId = 'new' | 'in-progress' | 'submitted' | 'won' | 'lost';

interface RFP {
  id: string;
  title: string;
  client: string;
  value: number;
  columnId: ColumnId;
}

interface Column {
  id: ColumnId;
  title: string;
}

interface KanbanBoardProps {
  initialCards?: RFP[];
  onCardMove?: (cardId: string, newColumnId: ColumnId) => void;
}

// --- DEFAULT DATA (for demonstration) ---
const DEFAULT_COLUMNS: Column[] = [
  { id: 'new', title: 'New' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'submitted', title: 'Submitted' },
  { id: 'won', title: 'Won' },
  { id: 'lost', title: 'Lost' },
];

const DEFAULT_CARDS: RFP[] = [
  { id: 'rfp-1', title: 'Enterprise Software Overhaul', client: 'Innovate Corp', value: 250000, columnId: 'new' },
  { id: 'rfp-2', title: 'Cloud Migration Strategy', client: 'DataStream LLC', value: 150000, columnId: 'new' },
  { id: 'rfp-3', title: 'Marketing Analytics Platform', client: 'MarketMinds', value: 75000, columnId: 'in-progress' },
  { id: 'rfp-4', title: 'Security Infrastructure Audit', client: 'SecureNet', value: 120000, columnId: 'submitted' },
  { id: 'rfp-5', title: 'Website Redesign', client: 'Creative Solutions', value: 50000, columnId: 'won' },
];


// --- MAIN COMPONENT ---
const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialCards = DEFAULT_CARDS, onCardMove }) => {
  const [cards, setCards] = useState<RFP[]>(initialCards);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  
  const columnRefs = useRef<Map<ColumnId, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    console.log('KanbanBoard loaded');
  }, []);

  const handleDragStart = (cardId: string) => {
    setDraggedCardId(cardId);
  };
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!draggedCardId) return;

    const dropX = info.point.x;
    let targetColumnId: ColumnId | null = null;

    columnRefs.current.forEach((el, colId) => {
        if (el) {
            const { left, right } = el.getBoundingClientRect();
            if (dropX >= left && dropX <= right) {
                targetColumnId = colId;
            }
        }
    });

    if (targetColumnId) {
        const currentCard = cards.find(c => c.id === draggedCardId);
        if (currentCard && currentCard.columnId !== targetColumnId) {
            setCards(prev => prev.map(c => c.id === draggedCardId ? { ...c, columnId: targetColumnId! } : c));
            if (onCardMove) {
                onCardMove(draggedCardId, targetColumnId);
                console.log(`Moved card ${draggedCardId} to column ${targetColumnId}`);
            }
        }
    }
    
    setDraggedCardId(null);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto bg-gray-100/50 dark:bg-gray-900/50 rounded-lg min-h-[600px]">
      {DEFAULT_COLUMNS.map((column) => (
        <div
          key={column.id}
          ref={(el) => columnRefs.current.set(column.id, el)}
          className="w-72 flex-shrink-0"
        >
          <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-t-lg sticky top-0 z-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider">{column.title}</h3>
          </div>
          <div className="p-2 space-y-3 h-full overflow-y-auto">
            {cards
              .filter((card) => card.columnId === column.id)
              .map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  layoutId={card.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // We control movement via styles
                  dragElastic={1}
                  onDragStart={() => handleDragStart(card.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "cursor-grab active:cursor-grabbing p-0",
                    draggedCardId === card.id ? "opacity-50 scale-105" : "opacity-100 scale-100"
                  )}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="p-3">
                      <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-sm">
                      <p className="text-gray-500 dark:text-gray-400">{card.client}</p>
                      <Badge variant="secondary" className="mt-2">
                        ${card.value.toLocaleString()}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;